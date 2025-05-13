import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";

export default function CartList({ cart, increaseQuantity, decreaseQuantity }) {
  return cart.map((item) => (
    <View key={item.code} style={styles.cartItem}>
      <Text style={styles.label}>
        {item.name} x{item.quantity} - L.
        {(item.price * item.quantity).toFixed(2)}
      </Text>
      <View style={styles.buttonRow}>
        <Text
          onPress={() => increaseQuantity(item.code)}
          style={styles.qtyButton}
        >
          ➕
        </Text>
        <Text
          onPress={() => decreaseQuantity(item.code)}
          style={styles.qtyButton}
        >
          ➖
        </Text>
      </View>
    </View>
  ));
}
