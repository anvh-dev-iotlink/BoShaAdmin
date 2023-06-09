import api from "./api"; 
const baseURL = "https://boshaadmin.site";
export const statisticServce = {
    getStatisticCard: async (from, to, uid) => {
        return await api.get(`${baseURL}/Statistic/GetStatisticCardsById?from=${from}&to=${to}&uid=${uid}`)
    },
    getStatisticChart: async (from, to, sortBy, uid) => {
        return await api.get(`${baseURL}/Statistic/GetStatisticChartByUId?from=${from}&to=${to}&sortBy=${sortBy}&uid=${uid}`)
    },
    getStatisticData: async (from , to, pageNumber, pageSize, sortBy, sortType, uid) => {
        return await api.get(`${baseURL}/Statistic/GetStatisticDataByUId?From=${from}&To=${to}&PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=retert&QueryString=ertertrt&SortBy=${sortBy}&SortType=${sortType}&uid=${uid}`)
    },
    getStatisticYear: async (year, uid) => {
        return await api.get(`${baseURL}/Statistic/GetStatisticRevenueYearByUId?year=${year}&uid=${uid}`)
    }
}