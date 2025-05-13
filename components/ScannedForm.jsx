import React from "react";
import { View,TextInput } from "react-native";

export default function ScannedForm({ code, setCode, name, setName, price, setPrice }) {
  return (
    <View style={{ padding: 10 }}>
      <TextInput
        placeholder="Código del producto"
        value={code}
        onChangeText={setCode}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Nombre del producto"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
    </View>
  );
}
