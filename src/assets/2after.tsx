//@ts-nocheck
import React from "react";
import "./Checkout.css";
import SubTotal from "./SubTotal";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import shortid from "shortid";

import { useTransition, animated } from "react-spring";

function Checkout() {
  const [{ basket, user }] = useStateValue();

  const getRandomKey = () => {
    return shortid.generate();
  };

  // define transition behaviour
  const transition = useTransition(basket, {
    from: { opacity: 0, marginLeft: -100, marginRight: 100 },
    enter: { opacity: 1, marginLeft: 0, marginRight: 0 }
  });

  return (
    <div className="checkout">
      <div className="checkout__left">
        <div className="checkout__title">
          <h2>Your shopping basket</h2>
          
          {transition((props, item) => {
            const keyNew = getRandomKey();

            //console.log(keyNew + "this is the new key");

            return (
              <animated.div style={props}>
                <CheckoutProduct
                  key={keyNew}
                  id={item.id}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  title={item.title}
                />
              </animated.div>
            );
          })}
        </div>
      </div>

      <div className="checkout__right">
        <h2>SubTotal component</h2>
        <SubTotal />
      </div>
    </div>
  );
}

export default Checkout;