import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Customer from "../models/Customer.js";

// Method : POST
// End Point : "api/v1/CartItem";
// Description : Add to cart
export const AddToCart = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Customer"){
            const {foodId,quantity,offerId} = req.body;
            const existingUser = await Customer.findOne({Email:user.Email});
            let cart = await Cart.findOne({Customer:existingUser.id});
            const session = await mongoose.startSession();
            try {
                if(cart){
                    console.log(req.body);
                    if(foodId !== undefined){
                        
                        let ItemIndex = cart.Foods.findIndex(key=>key.food == foodId);
                        console.log(ItemIndex);
                        if(ItemIndex > -1){
                            if(quantity !== null){
                                let foodItem = cart.Foods[ItemIndex]
                                foodItem.Quantity = quantity;
                                cart.Foods[ItemIndex] = foodItem;
                            }
                        }
                        else{
                            cart.Foods.push({food:foodId,Quantity:quantity});
                            console.log(cart.Foods);
                        }
                        cart = await cart.save();
                    }
                    else if(offerId !== undefined){
                        console.log(offerId);
                        let ItemIndex = cart.Foods.findIndex(key=>key.offer == offerId);
                        console.log(ItemIndex);
                        if(ItemIndex > -1){
                            if(quantity !== null){
                                let foodItem = cart.Foods[ItemIndex]
                                foodItem.Quantity = quantity;
                                cart.Foods[ItemIndex] = foodItem;
                            }
                        }
                        else{
                            
                            cart.Foods.push({offer:offerId,Quantity:quantity});
                            console.log(cart.Foods);
                        }
                        cart = await cart.save();
                    }
                    res.status(201).json({
                        status:'Success',
                        message:'Add Item into Cart',
                        data:{
                            cart
                        }
                    })
                }else{
                    if(foodId !== null){
                        session.startTransaction();
                        const newCart = await Cart.create([
                            {
                                Customer:existingUser.id,
                                Foods:[{
                                    food:foodId,
                                    Quantity:quantity
                                }]
                            }],
                            {session}
                        )
                        const commit = await session.commitTransaction();
                        session.endSession();
                        res.status(201).json({
                            status:'Success',
                            message:'Add Item into Cart',
                            data:{
                                newCart
                            }
                        })
                    }
                    else if(offerId !== null){
                        session.startTransaction();
                        const newCart = await Cart.create([
                            {
                                Customer:existingUser.id,
                                Foods:[{
                                    offer:offerId,
                                    Quantity:quantity
                                }]
                            }],
                            {session}
                        )
                        const commit = await session.commitTransaction();
                        session.endSession();
                        res.status(201).json({
                            status:'Success',
                            message:'Add Item into Cart',
                            data:{
                                newCart
                            }
                        })
                    }
                }
            } catch (error) {
                res.status(500).json({
                    status:'Error',
                    message:error.message
                })
            }
            
        }
    } catch (error) {
        res.status(500).json({
            status:'Server Error',
            message:error.message
        })
    }
} 


// Method : POST
// End Point : "api/v1/CartItems";
// Description : View Cart
export const viewCart = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Customer"){
            const customer = await Customer.findOne({Email:user.Email});
            let existingcart = await Cart.findOne({Customer:customer.id});
            Cart.findOne({ Customer: customer.id })
            .populate({
                path: 'Foods.food',
                model: 'Foods'
            })
            .populate({
                path:'Foods.offer',
                model:'Offers'
            })
            .exec((err, cart) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Server Error');
                }
                if (!cart) {
                    return res.status(404).send('Cart not found');
                }
                // Access the populated food details
                const foods = cart.Foods.map((item) => {
                    if(item.food !== undefined){
                        return {
                            cartId: existingcart.id, 
                            Foodid: item.food.id,
                            name: item.food.FoodName,
                            image: item.food.FoodImage,
                            price: item.food.Price,
                            category: item.food.Category,
                            quantity: item.Quantity,
                            TotalPrice: item.food.Price * item.Quantity
                        };
                    } else if(item.offer !== undefined){
                       return{
                            cartId: existingcart.id, 
                            Offerid: item.offer.id,
                            name: item.offer.OfferName,
                            image: item.offer.OfferImage,
                            price: item.offer.SpecialPrice,
                            category: item.offer.Category,
                            quantity: item.Quantity,
                            TotalPrice: item.offer.SpecialPrice * item.Quantity
                       }
                    }
                });
                res.json(foods);
            });
        }
    } catch (error) {
        res.status(500).json({
            status:'Server Error',
            message:error.message
        })
    }
}


// Method : PATCH
// End Point : "api/v1/customer/RemoveCartItem";
// Description : Remove Cart Item
export const removeFoodFromCart = async (req, res) => {
    try {
        const { cartId, foodId, offerId } = req.body;
        console.log(cartId);
      const cart = await Cart.updateOne(
        { _id: cartId },
        { $pull: { Foods: { food: foodId } || {offer: offerId}} }
      );
      res.status(200).json({ success: true, message: "Food item removed from cart",data:{cart} });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to remove food item from cart" });
    }
  };