import { Link } from "expo-router";
import { Text } from "./Themed";
import { LinkProps } from "expo-router/build/link/Link";

export default function ({ title, ...props }: { title: string } & LinkProps) {
  return (
    <Link {...props}>
      <Text>{title}</Text>
    </Link>
  )
}