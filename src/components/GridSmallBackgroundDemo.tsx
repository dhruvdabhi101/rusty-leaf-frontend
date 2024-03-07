import React from "react";

export function GridSmallBackgroundDemo({ children }: any) {
    return (
      
       <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                {children}
        </div>
        

      
    );
}


export function DotBackgroundDemo({ children }: any) {
    return (
        <div>

        </div>
        // <div className="h-full w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        //     {/* Radial gradient for the container to give a faded look */}
        //     <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_65%,black)]"></div>
        //     {children}
        // </div>
    );
}
