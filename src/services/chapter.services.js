import api from "./api"; 
const baseURL = "https://boshaapi.site";
const baseAdminURL = "https://boshaadmin.site";
export const chapterService = {
    chapters: async (bookId) => {
        return await api.get(`${baseURL}/Chapter/Chapters?bookId=${bookId}`)
    },
    chapterDetail: async (chapId) => {
        return await api.get(`${baseAdminURL}/Chapter/ChapterDetail?chapterId=${chapId}`)
    },
    getChapterNextIndex: async (bookId) => {
        return await api.get(baseURL+'/Chapter/GetNextIndex?bookId='+bookId)
    },
}
