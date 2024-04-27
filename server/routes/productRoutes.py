from flask import Blueprint, jsonify, request
from models.databaseModels import Product
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
    product = Product.query.get(product_id)
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
    products = Product.query.filter_by(category=category).all()

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