import {
  IconMoneybag,
  IconReceipt,
  IconClockHour11,
} from "@tabler/icons-react";
import {
  LineChart,
  DoughnutChart,
  TransactionTable,
} from "../components/Dashboard";

const Home = () => {
  return (
    <>
      <div className="p-4 sm:ml-64 flex flex-col gap-2">
        <h1 className="text-3xl mb-3">Dashboard</h1>
        <div className=" grid grid-cols-2	gap-2 sm:flex sm:flex-wrap ">
          <div className="flex flex-col items-center bg-emerald-500 gap-0 md:gap-2 border border-gray-200 rounded-lg shadow md:flex-row w-[170px] sm:[150px] md:w-52 px-10">
            <IconMoneybag color="white" width={48} height={85} />
            <div className="flex flex-col justify-between p-2 leading-normal">
              <h5 className="text-2xl font-bold tracking-tight text-white">
                2000
              </h5>
              <p className="mb-3 font-normal text-white">Budget</p>
            </div>
          </div>
          <div className="flex flex-col items-center bg-amber-400 gap-0 md:gap-2 border border-gray-200 rounded-lg shadow md:flex-row w-[170px] sm:[150px] md:w-52 px-10">
            <IconReceipt color="white" width={48} height={85} />

            <div className="flex flex-col justify-between p-2 leading-normal">
              <h5 className="text-2xl font-bold tracking-tight text-white">
                2000
              </h5>
              <p className="mb-3 font-normal text-white">Spent</p>
            </div>
          </div>
          <div className="flex flex-col items-center bg-rose-500 gap-0 md:gap-2 border border-gray-200 rounded-lg shadow md:flex-row w-[170px] sm:[150px] md:w-52 px-10">
            <IconClockHour11 color="white" width={48} height={85} />

            <div className="flex flex-col justify-between p-2 leading-normal">
              <h5 className="text-2xl font-bold tracking-tight text-white">
                2000
              </h5>
              <p className="mb-3 font-normal text-white">Recent: Dog</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[400px]">
          <LineChart />
        </div>
        <div className="self-center h-[400px]">
          <DoughnutChart />
        </div>
        <TransactionTable />
      </div>
    </>
  );
};

export default Home;
