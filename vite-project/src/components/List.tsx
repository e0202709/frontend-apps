import { ReactNode } from "react";

//its a generic type, we dont know the item type beforehand
interface ListProps<T> {
  items: T[];
  render: (item: T) => ReactNode;
}

//T is any object
//{} means can be any tupe, but cannot be null or undefined
const List = <T extends {}>({ items, render }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{render(item)}</li>
      ))}
    </ul>
  );
};

export default List;