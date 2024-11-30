import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAttestationsToday } from "../api/services/Attestations";
import { doughnutData } from "./useChartData";

const useAttestations = (token) => {
    const [ infoKpi, setInfoKpi ] = useState(null);
    const [ infoDoughnutChart, setInfoDoughnutChart ] = useState(null);

    const fetchAttestations = async () => {
        try {
            const data = await getAttestationsToday(token);
            if (data) processAttestations(data);
        } catch (error) {
            toast.error(`Erro ao processar seus gráficos: ${error.message}`);
            console.error(error);
        }
    };

    const processAttestations = (data) => {
        const quantidadePedidos = data.length;
        const lucro = data.reduce((sum, current) => sum + current.totalValue, 0);

        setInfoKpi({ quantidadePedidos, lucro });

        const infos = {
            delivery: data.filter((it) => it.orderType === "delivery").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2),
            saloon: data.filter((it) => it.orderType === "saloon").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2),
        };
        setInfoDoughnutChart(doughnutData(infos));
    };

    useEffect(() => {
        fetchAttestations();
    }, []);

    return { infoKpi, infoDoughnutChart };
}

export default useAttestations;