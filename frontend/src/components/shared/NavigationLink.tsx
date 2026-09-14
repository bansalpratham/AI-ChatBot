import { Link } from "react-router-dom";

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?:() => Promise<void>;
}

function NavigationLink({ to, bg, text, textColor}: Props) {
  return <Link to={to} style={{background: bg, color:textColor}} >{text}</Link>
}

export default NavigationLink;