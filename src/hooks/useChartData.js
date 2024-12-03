import { useEffect, useState } from "react";
import { json } from "react-router-dom";

// export const doughnutData = (data) => {
//     return {
//         data: {
//             labels: ["Delivery", "Salão"],
//             datasets: [{
//                 label: "Faturamento (R$)",
//                 data: [data.delivery, data.saloon],
//                 backgroundColor: ["#7B806A", "#B5B9A4"], 
//                 hoverOffset: 4, 
//                 borderWidth: 5,
//                 borderColor: "#EAE5DE",
//                 borderRadius: 10,
//             }],
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//                 title: {
//                     display: true,
//                     text: "Faturamentos por Período Semanal",
//                     font: {
//                         size: 20,
//                     },
//                 },
//                 legend: {
//                     position: "right", 
//                     labels: {
//                         font: {
//                             size: 20,
//                             weight: "bold",
//                         },
//                         usePointStyle: true,
//                         pointStyle: "circle",
//                         padding: 20
//                     },
//                 },
//             },
//             cutout: "42%",
//         },
//     }
// } 

export const doughnutData = (data) => {
    return {
        data: {
            labels: ["Delivery", "Salão"],
            datasets: [{
                label: "Faturamento (R$)",
                data: [data.delivery, data.saloon],
                backgroundColor: ["#7B806A", "#B5B9A4"], 
                borderRadius: 10,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "Faturamentos por Período Semanal",
                    font: {
                        size: 20,
                    },
                },
                legend: {
                    position: "right", 
                    labels: {
                        font: {
                            size: 20,
                        },
                    },
                    align: "center",
                },
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 18,
                        },
                    },

                    title: {
                        display: false,
                        text: "Tipo de Faturamento",
                    },
                    
                    grid: {
                        display: false,
                    },

                },
                
                y: {
                    ticks: {
                        font: {
                            size: 16,
                        },
                    },

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
    }
} 

export const barData = (data) => {
    return {
        data: {
            labels: [
                "Faturamento Semanal", 
                "Faturamento Mensal",
            ],
            datasets: [{
                label: false,
                data: [ data.weekly, data.monthly, ], 
                backgroundColor: ["#7B806A", "#B5B9A4"],
                borderRadius: 10,
            }],
        },
        
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "Faturamento por Pedido",
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
                    ticks: {
                        font: {
                            size: 18,
                        },
                    },

                    title: {
                        display: false,
                        text: "Tipo de Faturamento",
                    },
                    
                    grid: {
                        display: false,
                    },

                },
                
                y: {
                    ticks: {
                        font: {
                            size: 20,
                        },
                    },

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
    }
}

function useChartData() {

    useEffect(() => {
        const fetchData = async () => {
            try {

                // const invoicingResponse = await fetch();
                // const profitReponse = await fetch();

                // const invoicingJson = await invoicingReponse.json();
                // const profitJson = await profitResponse.json();

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