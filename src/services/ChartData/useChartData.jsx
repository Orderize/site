import { useEffect, useState } from "react";

function useChartData() {
    const [invoicingData, setInvoicingData] = useState(null);
    const [profitData, setProfitData] = useState(null);
    const [hourlyInvoicingData, setHourlyInvoicingData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                // const invoicingResponse = await fetch();
                // const profitReponse = await fetch();

                // const invoicingJson = await invoicingReponse.json();
                // const profitJson = await profitResponse.json();

                setInvoicingData({
                    data: {
                        labels: ["Delivery", "Salão"],
                        datasets: [{
                            label: "Faturamento (R$)",
                            data: [680, 2345],
                            backgroundColor: ["#7B806A", "#B5B9A4"], 
                            hoverOffset: 4, 
                            borderWidth: 5,
                            borderColor: "#EAE5DE",
                            borderRadius: 10,
                        }],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: "Faturamentos por Período",
                                font: {
                                    size: 20,
                                },
                            },
                            legend: {
                                position: "right", 
                                labels: {
                                    font: {
                                        size: 20,
                                        weight: "bold",
                                    },
                                    usePointStyle: true,
                                    pointStyle: "circle",
                                    padding: 20
                                },
                            },
                        },
                        cutout: "42%",
                    },
                });

                setProfitData({
                    data: {
                        labels: [
                            "Faturamento Diário", 
                            "Média Semanal", 
                            "Média Mensal",
                        ],
                        datasets: [{
                            label: false,
                            data: [ 3125, 3345, 3608, ], 
                            backgroundColor: ["#7B806A", "#B5B9A4", "#B5B9A4"],
                            borderRadius: 10,
                        }],
                    },
                    
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: "Faturamento R$ por Pedido",
                                font: {
                                    size: 20,
                                },
                            },
                            legend: {
                                display: false,
                                position: "bottom",
                                align: "center",
                                labels: {
                                    fontSize: 20,
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: false,
                                    text: "Tipo de Faturamento",
                                },
                                
                                grid: {
                                    display: false,
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Valor (R$)",
                                    font: {
                                        size: 16,
                                        weight: 'bold',
                                    },
                                },
                                grid: {
                                    display: false,
                                },
                                beginAtZero: true,
                            },
                        },
                    },
                });

                setHourlyInvoicingData({
                    data: {
                        labels: [
                            "08:00", "09:00", "10:00", "11:00", "12:00", 
                            "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
                        ],
                        datasets: [{
                            // label: "Faturamento (R$)",
                            data: [150, 300, 250, 400, 500, 600, 700, 800, 900, 950, 1100, 1200], // Exemplo de dados
                            borderColor: "#7B806A",
                            backgroundColor: "rgba(123, 128, 106, 0.2)",
                            borderWidth: 2,
                            fill: true,
                        }],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                                position: "top",
                                labels: {
                                    font: {
                                        size: 20,
                                        weight: "bold",
                                    },
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: "Horas do Dia",
                                    font: {
                                        size: 16,
                                        weight: 'bold',
                                    },
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Faturamento (R$)",
                                    font: {
                                        size: 16,
                                        weight: 'bold',
                                    },
                                },
                                beginAtZero: true,
                            },
                        },
                    },
                });

            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            }
        };

        fetchData();
    }, []);

    return { invoicingData, profitData, hourlyInvoicingData };

};

export default useChartData;