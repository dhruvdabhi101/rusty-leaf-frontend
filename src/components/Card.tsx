import Link from "next/link";
import { Badge, PrefferedBadge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type idObject = {
    "$oid": string
}

export default function PageCard({ params }: { params: { title: string, slug: string, published: boolean, _id: idObject } }) {
    return (
        <Card className="w-[370px] md:w-[350px] lg:w-[330px]">
            <Link href={`home/page/${params["_id"]["$oid"]}`}>
                <CardHeader>
                    <CardTitle className="text-lg">{params.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2" >
                    <p> <span className="font-semibold">slug: </span>  <span className="text-neutral-500 hover:text-neutral-300">{params.slug}</span></p>
                    <PrefferedBadge bool={params.published} />
                </CardContent>
            </Link>
        </Card>
    )
}

