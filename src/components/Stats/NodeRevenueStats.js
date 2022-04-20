/*eslint-disable*/
import React, {useEffect, useState} from "react";
import {unstable_batchedUpdates} from 'react-dom';
import {getNodeRevenueStats} from "services/dashboardService.js";
import themeStyle from "utils/themeStyle.js";
import {t} from "utils/text.js";


export default function NodeRevenueStats({color}) {

    const [chequeEarning, setChequeEarning] = useState(0);
    const [chequeExpense, setChequeExpense] = useState(0);
    const [uncashedPercent, setUncashedPercent] = useState(0);
    const [cashedPercent, setCashedPercent] = useState(0);
    const [airdrop, setAirdrop] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [chequePercent, setChequePercent] = useState(0);
    const [airDropPercent, setAirDropPercent] = useState(0);

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            let {chequeEarning, chequeExpense, uncashedPercent, cashedPercent, airdrop, totalEarnings, chequePercent, airDropPercent} = await getNodeRevenueStats();
            if (!didCancel) {
                unstable_batchedUpdates(() => {
                    setChequeEarning(chequeEarning);
                    setChequeExpense(chequeExpense);
                    setCashedPercent(cashedPercent);
                    setUncashedPercent(uncashedPercent);
                    setAirdrop(airdrop);
                    setTotalEarnings(totalEarnings);
                    setChequePercent(chequePercent);
                    setAirDropPercent(airDropPercent);
                })
            }
        };
        fetchData();
        return () => {
            didCancel = true;
        };
    }, []);

    return (
        <>
            <div className="relative pb-4">
                <div className="mx-auto w-full">
                    <div className="flex flex-wrap">
                        <div className="w-full xl:w-3/12 md:w-6/12 md:pr-2 md:mb-2 xl:mb-0">
                            <div
                                className={"relative break-words rounded " + themeStyle.bg[color] + themeStyle.text[color]}>
                                <div className="p-4 h-125-px">
                                    <div className="relative h-90-px flex flex-col justify-between">
                                        <h5 className={"uppercase font-bold " + themeStyle.title[color]}>
                                            {t('total_earnings')}
                                        </h5>
                                        <div>
                                            <span className="text-lg font-semibold">{totalEarnings}</span>
                                            <span className='text-xs'>BTT (WBTT)</span>
                                        </div>
                                        <div className='flex justify-between text-xs'>
                                            <div>
                                                <i className='dot dot_red mr-1'></i>
                                                {t('cheques')} {chequePercent}%
                                            </div>
                                            <div className='ml-2'>
                                                <i className='dot dot_orange mr-1'></i>
                                                {t('airdrop')} {airDropPercent}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-3/12 md:w-6/12 md:pl-2 xl:pr-2 md:mb-2 xl:mb-0">
                            <div
                                className={"relative break-words rounded " + themeStyle.bg[color] + themeStyle.text[color]}>
                                <div className="p-4 h-125-px">
                                    <div className="relative h-90-px flex flex-col justify-between">
                                        <h5 className={"uppercase font-bold " + themeStyle.title[color]}>
                                            {t('cheque_earnings')}
                                        </h5>
                                        <div>
                                            <span className='text-lg font-semibold'>{chequeEarning}</span>
                                            <span className='text-xs'>WBTT</span>
                                        </div>

                                        {/* <div className='flex justify-between text-xs'>
                                                    <div className=''>
                                                        <i className='dot dot_red mr-1'></i>
                                                        {t('cashed')} {cashedPercent}%
                                                    </div>
                                                    <div className=''>
                                                        <i className='dot dot_orange mr-1'></i>
                                                        {t('uncashed')} {uncashedPercent}%
                                                    </div>
                                                </div> */}

                                        <div className='flex'>
                                            <div>
                                                &nbsp;
                                            </div>
                                            <div className='ml-2'>
                                                &nbsp;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-3/12 md:w-6/12 xl:pl-2 md:pr-2">
                            <div
                                className={"relative break-words rounded " + themeStyle.bg[color] + themeStyle.text[color]}>
                                <div className="p-4 h-125-px">
                                    <div className="relative h-90-px flex flex-col justify-between">
                                        <h5 className={"uppercase font-bold " + themeStyle.title[color]}>
                                            {t('cheque_expense')}
                                        </h5>
                                        <div>
                                            <span className='text-lg font-semibold'>{chequeExpense}</span>
                                            <span className='text-xs'>WBTT</span>
                                        </div>

                                        <div className='flex'>
                                            <div>
                                                &nbsp;
                                            </div>
                                            <div className='ml-2'>
                                                &nbsp;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-3/12 md:w-6/12 xl:pl-2 md:pl-2">
                            <div
                                className={"relative break-words rounded " + themeStyle.bg[color] + themeStyle.text[color]}>
                                <div className="p-4 h-125-px">
                                    <div className="relative h-90-px flex flex-col justify-between">
                                        <h5 className={"uppercase font-bold " + themeStyle.title[color]}>
                                            {t('airdrop')}
                                        </h5>
                                        <div className="font-semibold text-lg">
                                            {airdrop}
                                        </div>
                                        <div className='flex'>
                                            <div>
                                                &nbsp;
                                            </div>
                                            <div className='ml-2'>
                                                &nbsp;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
