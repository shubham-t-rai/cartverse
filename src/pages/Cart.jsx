import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/features/cardSlice";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-bold ">
        Your Cart is Empty
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-6 mb-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Bag</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow flex gap-4 flex-col sm:flex-row"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full sm:w-32 h-32 object-contain bg-gray-100 rounded"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-sm sm:text-base line-clamp-2">
                  {item.title}
                </h2>

                <p className="mt-2 font-bold">${item.price}</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="px-3 py-1 border rounded active:scale-95"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="px-3 py-1 border rounded active:scale-95"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="mt-3 bg-red-500 px-2 py-2 rounded-lg text-white active:scale-95 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="bg-white p-5 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-3">
            <span>Items</span>
            <span>{items.length}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Total</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>

          <button className="w-full mt-4 bg-(--secondary-text-color) text-white py-3 rounded font-semibold active:scale-95">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;