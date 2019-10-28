import React, { useState, useEffect } from 'react';

interface Props {
  width: number;
}

export const index: React.FC<Props> = props => {
  const [isShow, setShow] = useState<boolean>(false);

  return <div> {props.children}</div>;
};
