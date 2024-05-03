from flask import Blueprint, jsonify, request
from models.databaseModels import (
    Product, 
    Product2, 
    CPU, 
    GPU,
    RAM,
    Motherboard
)
from server import bcrypt
from extensions.extensions import database

productBP = Blueprint('productBP', __name__)

@productBP.route("/api/products", methods=["GET"])
def get_products():
    all_product_data = Product.query.all()
    return jsonify(
        {
            "products": [
                {
                    "id": product.product_id,
                    "title": product.title,
                    "category": product.category,
                    "description": product.description,
                    "image": product.image,
                    "price": product.price,
                    "rating": product.rating,
                    "uri": product.uri,
                }
                for product in all_product_data
            ]
        }
    )

@productBP.route("/api/products/<int:product_id>", methods=["GET"])
def get_product_details(product_id):
    product = Product2.query.get(product_id)
    if product:
        return jsonify(
            {
                "product": {
                        "id": product.product_id,
                        "title": product.title,
                        "category": product.category,
                        "description": product.description,
                        "image": product.image,
                        "price": product.price,
                        "rating": product.rating,
                        "uri": product.uri,
                    }
            }
        )
    else:
        return jsonify({"error": "Product not found"}), 404
    
@productBP.route("/api/products/related/<string:category>", methods=["GET"])
def get_related_products(category):
    products = Product2.query.filter_by(category=category).all()

    if products:
        return jsonify(
            {
                "products": [
                    {
                        "id": product.product_id,
                        "title": product.title,
                        "category": product.category,
                        "description": product.description,
                        "image": product.image,
                        "price": product.price,
                        "rating": product.rating,
                        "uri": product.uri,
                    }
                    for product in products
                ]
            }
        )
    else:
        return jsonify({"message": "No products found in this category"}), 404

# will prob be removed, better to handle filtering in frontend to min reqs to server
#@productBP.route("/api/products/filter/cpu", methods=["GET"])
#def product_filtering_cpu():
#    query = Product2.query
#    cpu_brand = request.args.get('cpu_brand')
#    cpu_cores = request.args.get('cpu_cores')
#
#    if cpu_brand:
#        query = query.join(CPU).filter(CPU.brand == cpu_brand)
#    if cpu_cores:
#        query = query.join(CPU).filter(CPU.cores >= int(cpu_cores))
#    
#    filtered_products = query.all()
#    return jsonify([product.title for product in filtered_products])
#

@productBP.route('/api/allProducts', methods=['GET'], endpoint='unique_get_products')
def get_products():
    try:
        products = Product2.query.all()
        product_list = [{
            'id': product.product_id,
            'title': product.title,
            'category': product.category,
            'description': product.description,
            'image': product.image,
            'price': float(product.price),
            'rating': product.rating,
            'uri': product.uri,
            'cpu': {
                'cpu_id': product.cpu.cpu_id,
                'brand': product.cpu.brand,
                'model': product.cpu.model,
                'cores': product.cpu.cores,
                'threads': product.cpu.threads,
                'base_clock': product.cpu.base_clock,
                'boost_clock': product.cpu.boost_clock,
                'socket_type': product.cpu.socket_type,
                'tdp': product.cpu.tdp
            } if product.cpu else None,
            'gpu': {
                'gpu_id': product.gpu.gpu_id,
                'brand': product.gpu.brand,
                'model': product.gpu.model,
                'memory_size': float(product.gpu.memory_size),
                'memory_type': product.gpu.memory_type,
                'gpu_clock': product.gpu.gpu_clock,
                'memory_clock': product.gpu.memory_clock,
                'tdp': product.gpu.tdp
            } if product.gpu else None,
            'ram': {
                'ram_id': product.ram.ram_id,
                'brand': product.ram.brand,
                'model': product.ram.model,
                'memory_size': product.ram.memory_size,
                'speed': product.ram.speed,
                'type': product.ram.type
            } if product.ram else None,
            'motherboard': {
                'motherboard_id': product.motherboard.motherboard_id,
                'brand': product.motherboard.brand,
                'model': product.motherboard.model,
                'chipset': product.motherboard.chipset,
                'form_factor': product.motherboard.form_factor,
                'socket_type': product.motherboard.socket_type
            } if product.motherboard else None,
        } for product in products]

        return jsonify({"products": product_list})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
