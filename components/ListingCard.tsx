import Image from 'next/image';
import moment from 'moment';
import { IServerData } from '../utils/interfaces';
import Button from './Button';
import { useState } from 'react';

const Divider = () => <div className="border-[.7px] border-[#00000029]" />;

export default function ListingCard({
   tokenId,
   listingTime,
   nature,
   price,
   isMakingProfit,
   marketPlace,
   rank,
}: IServerData) {
   const [isHovering, setHovering] = useState<boolean>(false);
   return (
      <div
         className={`flex bg-[#262B2F] h-[66.83px]  rounded-[5px] relative border-r-[6px]  w-[339px] hover:bg-[#313741]`}
         style={{ borderColor: nature }}
         onMouseEnter={() => setHovering(true)}
         onMouseLeave={() => setHovering(false)}
      >
         <div className="flex flex-col bg-[#313E49] w-[21px] justify-evenly rounded-[5px] ">
            <Image
               src={`${isMakingProfit ? '/ArrowUp.svg' : '/ArrowDown.svg'}`}
               width={10}
               height={10}
               alt="arrow-down"
            />
            <Divider />
            <Image src={'/Whale.svg'} width={10} height={10} alt="whale" />
            <Divider />
            <Image src={'/MoneyBag.svg'} width={10} height={10} alt="money" />
         </div>
         <div className="flex py-[7px] pl-[10px] pr-[5px] justify-between w-full">
            <div className="flex">
               <div className="relative pr-[13px] flex justify-center">
                  <Image
                     src={`https://img.nftnerds.ai/0xed5af388653567af2f388e6224dc7c4b3241c544_${tokenId}_96x96`}
                     width={53}
                     height={53}
                     alt="arrow-down"
                     className="rounded-md"
                  />
                  <p className="text-white absolute z-10 bottom-0 text-[11px] font-medium leading-[16.5px]">
                     #{tokenId}
                  </p>
               </div>
               <p className="text-sm font-medium text-[rgba(255,255,255,0.5)]">
                  Rank: <span style={{ color: nature }}>{rank}</span>
               </p>
            </div>
            <div>
               <div className="flex items-center gap-x-[7px]">
                  <div className="flex items-center gap-x-[3.5px]">
                     <Image src={'/Ethereum.svg'} width={10} height={10} alt="eth" />
                     <p className="text-white text-[15px] font-medium">{price}</p>
                  </div>
                  <Button title="Buy" isHovering={isHovering} />
                  <Image
                     src={`${marketPlace === 'opensea' ? '/OpenSea.svg' : '/LooksRare.svg'}`}
                     width={19}
                     height={19}
                     alt="market"
                  />
               </div>
               <div className="text-[#FFFFFF80] flex justify-end">
                  {moment(new Date(listingTime)).startOf('hour').fromNow()}
               </div>
            </div>
         </div>
      </div>
   );
}
