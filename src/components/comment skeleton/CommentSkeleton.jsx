import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

export default function CommentSkeleton() {
  return (
  
      
      <div className="space-y-3" style={{width:'100%'}}>
        <Skeleton className="w-2/5 rounded-lg">  
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
           <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-5/5 rounded-lg">
          <div className="h-3 w-5/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        
      </div>
      

  );
}
