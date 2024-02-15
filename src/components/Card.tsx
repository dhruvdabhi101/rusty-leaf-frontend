import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function PageCard() {
    return (
        <Card className="w-[370px] md:w-[350px] lg:w-[330px]">
            <CardHeader>
                <CardTitle className="text-lg"> Page Title </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2" >
                <p> <span className="font-semibold">slug: </span>  <span className="text-neutral-500 hover:text-neutral-300"> this-is-slug</span></p>
                <Badge variant={"outline"} className="border-green-400 w-fit text-clip hover:bg-green-400 hover:text-black"> Active </Badge>
            </CardContent>
        </Card>
    )
}
