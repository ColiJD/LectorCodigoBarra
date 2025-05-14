import React from "react";
import { View, Text } from "react-native";
import { styledCart } from "../styles/styles";

export default function CartList({ cart, increaseQuantity, decreaseQuantity }) {
  return cart.map((item) => (
    <View key={item.code} style={styledCart.cartItem}>
      <Text style={styledCart.Text}>{item.quantity}</Text>
      <Text style={[styledCart.Text, { width: "50%" }]}>{item.name}</Text>
      <Text style={[styledCart.Text, { width: "20%" }]}>
        L.{(item.price * item.quantity).toFixed(2)}
      </Text>
      <View>
        <Text onPress={() => increaseQuantity(item.code)}>➕</Text>
        <Text
          disabled={item.quantity < 1}
          onPress={() => decreaseQuantity(item.code)}
        >
          ➖
        </Text>
      </View>
    </View>
  ));
}
