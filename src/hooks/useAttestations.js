import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAttestationsToday } from "../api/services/Attestations";
import { barData, doughnutData } from "./useChartData";
import { getReportsMonth, getReportsWeek } from "../api/services/Reports";

const useAttestations = (token) => {
    const [ infoKpi, setInfoKpi ] = useState(null);
    const [ infoDoughnutChart, setInfoDoughnutChart ] = useState(null);
    const [ infoBarChart, setInfoBarChart ] = useState(null);

    const handleAttestations = async () => {
        const data = await getAttestationsToday();
        if (data.length > 0) {
            const quantidadePedidos = data.length;
            console.log(data);
            
            const lucro = data.reduce((sum, current) => sum + current.totalValue, 0);
    
            setInfoKpi({ quantidadePedidos, lucro });
    
            const infos = {
                delivery: data.filter((it) => it.orderType.toLowerCase() === "delivery").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2),
                saloon: data.filter((it) => it.orderType.toLowerCase() === "saloon").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2),
            };
            setInfoDoughnutChart(doughnutData(infos));
        }
    }

    const handleReports = async () => {
        const weekData = await fetchReportsWeek();
        const monthData = await fetchReportsMonth();
        
        setInfoKpi(prev => ({
            ...prev,
            ticket: weekData.averageDailyRevenue,
            mostOrdered: weekData.mostOrderedFlavor.name
        }));
                
        const infosReport = {
            weekly: weekData.revenue,
            monthly: monthData.revenue
        };
        
        setInfoBarChart(barData(infosReport));
    }

    const fetchReportsWeek = async () => {
        try {
            const data = await getReportsWeek(token);
            return data;
        } catch (error) {
            toast.error(`Erro ao processar seus gráficos: ${error.message}`);
            console.error(error);
        }
    }

    const fetchReportsMonth = async () => {
        try {
            const data = await getReportsMonth(token);
            return data;
        } catch (error) {
            toast.error(`Erro ao processar seus gráficos: ${error.message}`);
            console.error(error);
        }
    }

    useEffect(() => {
        handleAttestations();
        handleReports();
    }, []);
    
    return { infoKpi, infoDoughnutChart, infoBarChart };
}

export default useAttestations;