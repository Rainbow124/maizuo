import axios from "axios";
import router from "@/router";

const state = {
  movieInfo: {}
};

const getters = {};

const mutations = {
  setFilmDetail(state, payload) {
    state.movieInfo = payload.filmDetails;
  }
};

const actions = {
  getFilmDetails({ commit }) {
    // Toast.loading({ duration: 0, mask: true, message: "加载中..." });

    let filmId = router.currentRoute.params.filmId;
    // console.log(filmId);
    axios
      .get("https://m.maizuo.com/gateway", {
        params: {
          filmId: filmId,
          k: 5197937
        },
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"15611724249216999819667"}',
          "X-Host": "mall.film-ticket.film.info"
        }
      })
      .then(response => {
        let res = response.data;
        // console.log(res);
        // console.log(res.data.film);

        if (res.status === 0) {
          //  1.将电影数据给到仓库
          commit({ type: "setFilmDetail", filmDetails: res.data.film });
        }
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
