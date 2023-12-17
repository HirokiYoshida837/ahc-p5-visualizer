'use client'

import { SketchComponent } from '@/libs/components/sketch-components';
import { NextPage } from 'next';
import p5Types from 'p5'
import {TenantName} from "@/app/ahc020/_components/tenant-name";

const canvasSize = {
    x: 500,
    y: 500,
};

let ellipsePosX = 0;
let ellipsePosY = 250;

const Page: NextPage = () => {





    // const setUp = (p5: p5Types, canvasParentRef: Element) => {
    //     p5.createCanvas(canvasSize.x, canvasSize.y).parent(canvasParentRef);
    // };

    // const draw = (p5: p5Types) => {
    //     p5.background(0);
    //     p5.ellipse(ellipsePosX, ellipsePosY, 20, 20);

    //     ellipsePosX += 5;

    //     if (ellipsePosX > canvasSize.x) {
    //         ellipsePosX = 0;
    //     }

    // };

    return (
        <>
          <TenantName/>

            <input
                id="sample-input"
            />

            {/* <SketchComponent setup={setUp} draw={draw} /> */}
        </>
    );
}

export default Page;
