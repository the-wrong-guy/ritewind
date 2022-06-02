import ListingCard from '../components/ListingCard';
import axios from 'axios';
import { IServerData } from '../utils/interfaces';

const url = 'https://s3objectlambda-test.s3.us-east-1.amazonaws.com/warm/0xed5af388653567af2f388e6224dc7c4b3241c544';
const rankUrl =
   'https://s3objectlambda-test.s3.us-east-1.amazonaws.com/tally_ranks/0xed5af388653567af2f388e6224dc7c4b3241c544';

function Home({ serverData }: { serverData: IServerData[] }) {
   return (
      <div className="py-10 px-5 flex w-full flex-col gap-3 items-center">
         {serverData.map((item: IServerData) => (
            <ListingCard
               key={item.tokenId + item.listingTime}
               isMakingProfit={item.isMakingProfit}
               tokenId={item.tokenId}
               listingTime={item.listingTime}
               price={item.price}
               marketPlace={item.marketPlace}
               nature={item.nature}
               rank={item.rank}
            />
         ))}
      </div>
   );
}

export default Home;

export async function getServerSideProps(context: any) {
   const { data } = await axios.get(url);
   const data2 = await axios.get(rankUrl);
   const tokenIds = data.token_ids;
   const listingTimes = data.listing_times;
   const natures = data.natures;
   const prices = data.prices;
   const lastTradeEvents = data.last_trade_events;
   const marketPlaces = data.marketplaces;
   const ranks = data2.data.ranks;

   let newData: IServerData[] = [];

   const checkIfMakingProfit = (index: number) => {
      if (lastTradeEvents[index] !== null) {
         if (prices[index] > lastTradeEvents[index]['price']) return true;
         else return false;
      } else return true;
   };

   const checkNature = (index: number) => {
      switch (natures[index]) {
         case null || 4:
            return '#C7C6C6';
         case 1:
            return '#1DB448';
         case 2:
            return '#FEB137';
         case 3:
            return '#FF4747';
         default:
            return '#C7C6C6';
      }
   };

   if (data) {
      new Array(100).fill(undefined).forEach((n, index) => {
         const newDataObj = {
            tokenId: tokenIds[index],
            listingTime: listingTimes[index],
            nature: checkNature(index),
            price: prices[index],
            isMakingProfit: checkIfMakingProfit(index),
            marketPlace: marketPlaces[index] === 1 ? 'opensea' : 'looksrare',
            rank: ranks[index][0],
         };
         newData.push(newDataObj);
      });
   }

   return {
      props: { serverData: newData },
   };
}
