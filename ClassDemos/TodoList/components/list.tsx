import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { insertTask } from "../redux/actions/todoActions";
import { View, Text, Button } from "react-native";

const list = () => {
  const tasks: any = useSelector((state: any) => state.todo.tasks);
  const dispatch = useDispatch();
  console.log(tasks);
  return (
    <View>
      <Text> Test : {tasks}</Text>
      <Button title="test" onPress={() => dispatch(insertTask())} />
    </View>
  );
};

export default list;
