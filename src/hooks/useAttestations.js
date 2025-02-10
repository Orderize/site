import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAttestationsToday } from "../api/services/Attestations";
import { barData, doughnutData } from "./useChartData";
import { getReportsMonth, getReportsWeek } from "../api/services/Reports";

const useAttestations = () => {
    const [ infoKpi, setInfoKpi ] = useState(null);
    const [ infoDoughnutChart, setInfoDoughnutChart ] = useState(null);
    const [ infoBarChart, setInfoBarChart ] = useState(null);

    const handleAttestations = async () => {
        const data = await getAttestationsToday();
        
        let lucro = 0; 
        let quantidadePedidos = 0;
        const infos = { delivery: 0, saloon: 0, };
        
        if (data.length > 0) {
            quantidadePedidos = data.length;
            lucro = data.reduce((sum, current) => sum + current?.totalValue, 0);
            
            infos.delivery = data.filter((it) => it.orderType.toLowerCase() === "delivery").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2);
            infos.saloon = data.filter((it) => it.orderType.toLowerCase() === "saloon").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2);     
        }
        
        setInfoKpi({ quantidadePedidos, lucro });
        setInfoDoughnutChart(doughnutData(infos));
    }

    const handleReports = async () => {
        const weekData = await getReportsWeek();
        const monthData = await getReportsMonth();
        
        setInfoKpi(prev => ({
            ...prev,
            ticket: weekData.averageDailyRevenue ?? 0,
            mostOrdered: weekData.mostOrderedFlavor.name
        }));
                
        const infosReport = {
            weekly: weekData.revenue ?? 0,
            monthly: monthData.revenue ?? 0
        };
        
        setInfoBarChart(barData(infosReport));
    }

    useEffect(() => {
        handleAttestations();
        handleReports();
    }, []);
    
    return { infoKpi, infoDoughnutChart, infoBarChart };
}

export default useAttestations;