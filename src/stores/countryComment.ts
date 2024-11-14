import { defineStore } from 'pinia';
import type { CountryComment } from '@/types'

export const useCountryCommentsStore = defineStore('countryGold', {
  state: () => ({
    // 存放CountryGold对象的数组，并添加一些默认值
    countryComments: [{
      id: 1,
      comments: ['如果信仰有颜色，那一定是中国红🇨🇳', '中国🐮🍺']
    }, {
      id: 2,
      comments: ['USA Come on!!!', 'Fighting!!!🇺🇸'],
    },{
      id: 6,
      comments: ['🇫🇷🇫🇷🇫🇷', '法国加油！'],
    }] as CountryComment[],
  }),
  actions: {
    // 添加单个CountryGold对象到数组
    addCountryComment(countryId: number, comment: string) {
      const countryComment = this.countryComments.find(item => item.id === countryId);
      if (countryComment) {
        countryComment.comments.unshift(comment);
      } else {
        this.countryComments.push({ id: countryId, comments: [comment] });
      }
    },
  },
  getters: {
    // 获取某个国家的评论
    getCountryComments: (state) => (countryId: number) => {
      const countryComment = state.countryComments.find(item => item.id === countryId);
      return countryComment ? countryComment.comments : [];
    },
    // 获取所有国家的评论
    getAllCountryComments(state) {
      return state.countryComments;
    },
  }
});
