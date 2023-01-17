import { ReactElement } from "react";
import {useEffect, useState} from "react";

type HeadingProps = {
  title: string;
  //callBack : () => {};
};
const Heading = ({ title }: HeadingProps): ReactElement => {
  const [test, setTest] = useState(10);

  useEffect(() => {
    console.log("mount");
    console.log(test);

    return () => {
      console.log("cleanup");
    };
  }, [test]);
  return <div>{title}</div>;
};

export default Heading;
