import { Card } from "@mui/material";

export function CardCustom(props: {
  title?: string | undefined;
  isSmall?: boolean | undefined;
  children: JSX.Element[] | JSX.Element;
}): JSX.Element {
  const nameClass = props.isSmall ? "cardCustomSmall" : "CardCustom";

  return (
    <Card className={nameClass}>
      {props.title && <h3>{props.title}</h3>}
      {props.children}
    </Card>
  );
}
