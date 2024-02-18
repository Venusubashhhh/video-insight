import React from "react";
import {Card, Skeleton} from "@nextui-org/react";
import './SkeletonComponent.scss'
export default function SkeletonComponent() {
  return (
    <Card className="w-[100%] space-y-5 p-4" radius="lg" style={{height:'100%'}}>
     <div className="skeleton-card-wrap">
      <Skeleton className="rounded-lg" style={{height:'100%',width:'23%',marginRight:'26px'}}>
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg" style={{height:'100%',width:'23%',marginRight:'26px'}}>
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg" style={{height:'100%',width:'23%',marginRight:'26px'}}>
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg" style={{height:'100%',width:'23%'}}>
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      </div>
  
      <div className="skeleton-card-wrap-2">
      <Skeleton className="rounded-lg" style={{height:'100%',width:'23%',marginRight:'26px'}}>
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg" style={{height:'100%',width:'23%',marginRight:'26px'}}>
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg" style={{height:'100%',width:'23%',marginRight:'26px'}}>
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg" style={{height:'100%',width:'23%'}}>
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      </div>
  
      
    </Card>
  );
}
