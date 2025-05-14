import React from "react";
import { View, TextInput } from "react-native";
import { styledForm } from "../styles/styles";

export default function ScannedForm({
  code,
  setCode,
  name,
  setName,
  price,
  setPrice,
}) {
  return (
    <View style={styledForm.container}>
      <TextInput
        placeholder="Código del producto"
        value={code}
        onChangeText={setCode}
        style={styledForm.inputLabel}
      />
      <TextInput
        placeholder="Nombre del producto"
        value={name}
        onChangeText={setName}
        style={styledForm.inputLabel}
      />
      <TextInput
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styledForm.inputLabel}
      />
    </View>
  );
}
