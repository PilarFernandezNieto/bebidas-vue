import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificacionesStore } from "./notificaciones";

export const useFavoritosStore = defineStore("favoritos", () => {
  const favoritos = ref([]);

  const bebidas = useBebidasStore();
  const modal = useModalStore();
  const notificaciones = useNotificacionesStore();

  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem("favoritos")) ?? [];
  });

  watch(
    favoritos,
    () => {
      sincronizarLocalStorage();
    },
    {
      deep: true,
    }
  );
  function sincronizarLocalStorage() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  }

  function existeFavorito() {
    const favoritosLocalStorage =
      JSON.parse(localStorage.getItem("favoritos")) ?? [];
    return favoritosLocalStorage.some(
      (favorito) => favorito.idDrink === bebidas.receta.idDrink
    );
  }

  function agregarFavorito() {
    favoritos.value.push(bebidas.receta);
    notificaciones.mostrar = true;
    notificaciones.texto = "Se añadió a favoritos";
  }

  function eliminarFavoritos() {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito.idDrink !== bebidas.receta.idDrink
    );
    notificaciones.mostrar = true;
    notificaciones.texto = "Se eliminó de favoritos";
    notificaciones.error = true

  }

  function handleClickFavorito() {
    if (existeFavorito()) {
      eliminarFavoritos();
    } else {
      agregarFavorito();
    }
    modal.modal = false;
  }

  const noFavoritos = computed(() => favoritos.value.length === 0);
  return {
    favoritos,
    handleClickFavorito,
    noFavoritos,
    existeFavorito,
  };
});
