<template>
  <div class="member-access-container">
    <div class="member-access-content">
      <div class="left-column">
        <img
          src="/images/login/login.jpg"
          alt="Login background"
          class="login-image"
        />
      </div>

      <div class="right-column">
        <div class="form-container">
          <h2 class="form-title">Inscription</h2>

          <form @submit.prevent="handleSubmit" class="registration-form">
            <div class="form-group">
              <label for="name">Nom *</label>
              <input
                v-model="formData.name"
                type="text"
                id="name"
                required
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input
                v-model="formData.email"
                type="email"
                id="email"
                required
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="password">Mot de passe *</label>
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                required
                class="form-control"
              />
              <button type="button" @click="togglePasswordVisibility">
                <span v-if="showPassword">👁️</span>
                <span v-else>🙈</span>
              </button>
            </div>

            <div class="form-group">
              <label for="password_confirmation"
                >Confirmer le mot de passe *</label
              >
              <input
                v-model="formData.password_confirmation"
                :type="showConfirmPassword ? 'text' : 'password'"
                id="password_confirmation"
                required
                class="form-control"
              />
              <button type="button" @click="toggleConfirmPasswordVisibility">
                <span v-if="showConfirmPassword">👁️</span>
                <span v-else>🙈</span>
              </button>
            </div>

            <div class="form-group">
              <label for="adresse">Adresse *</label>
              <input
                v-model="formData.adresse"
                type="text"
                id="adresse"
                required
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="numero_telephone">Numéro de téléphone *</label>
              <input
                v-model="formData.numero_telephone"
                type="text"
                id="numero_telephone"
                required
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="numero_fiscal">Numéro fiscal *</label>
              <input
                v-model="formData.numero_fiscal"
                type="text"
                id="numero_fiscal"
                required
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="pays_id">Pays *</label>
              <select
                v-model="selectedPaysId"
                id="pays_id"
                required
                class="form-control"
                @change="handlePaysChange"
              >
                <option value="">Sélectionnez un pays</option>
                <option
                  v-for="pays in paysList"
                  :key="pays.id"
                  :value="pays.id"
                >
                  {{ pays.nom }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="ville_id">Ville *</label>
              <select
                v-model="formData.ville_id"
                id="ville_id"
                required
                class="form-control"
              >
                <option value="">Sélectionnez une ville</option>
                <option
                  v-for="ville in villesList"
                  :key="ville.id"
                  :value="ville.id"
                >
                  {{ ville.nom }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="etat_civil">État civil *</label>
              <select
                v-model="formData.etat_civil"
                id="etat_civil"
                required
                class="form-control"
              >
                <option value="">Sélectionnez votre état civil</option>
                <option value="Célibataire">Célibataire</option>
                <option value="Marié(e)">Marié(e)</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
                <option value="Veuf(ve)">Veuf(ve)</option>
              </select>
            </div>

            <div class="flex justify-between mt-6 buttons-container">
              <button
                type="button"
                @click="prevStep"
                class="btn btn-secondary"
                v-if="currentStep > 1"
              >
                ← Précédent
              </button>
              <button type="submit" class="btn btn-success">
                Terminer l'inscription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import PaysService from "../../../services/PaysService";
import VilleService from "../../../services/VilleService";
import { useAuthStore } from "../../../stores/auth";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";
export default {
  name: "MemberAccess",
  setup() {
    const authStore = useAuthStore();
    const formData = ref({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      adresse: "",
      numero_telephone: "",
      numero_fiscal: "",
      pays_id: "",
      ville_id: "",
      etat_civil: "",
    });
    const paysList = ref([]);
    const villesList = ref([]);
    const selectedPaysId = ref("");
    const selectedVilleId = ref("");
    const isLoading = ref(false);
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const toggleConfirmPasswordVisibility = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
    };

    const handlePaysChange = async () => {
      selectedVilleId.value = "";
      villesList.value = [];

      if (selectedPaysId.value) {
        try {
          isLoading.value = true;
          const response = await VilleService.getVillesByPays(
            selectedPaysId.value
          );
          villesList.value = Array.isArray(response)
            ? response
            : response.data || [];
          formData.value.pays_id = selectedPaysId.value;
        } catch (error) {
          console.error("Erreur lors du chargement des villes:", error);
        } finally {
          isLoading.value = false;
        }
      }
    };

    onMounted(async () => {
      try {
        const response = await PaysService.getAllPays();
        paysList.value = response.data?.data || response.data || [];
      } catch (error) {
        console.error("Erreur lors du chargement des pays:", error);
      }
    });

    const handleSubmit = async () => {
      try {
        await authStore.registerUsager(formData.value);
        // Handle successful registration (e.g., redirect or show a success message)
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        // Handle error (e.g., show an error message)
      }
    };

    return {
      formData,
      selectedPaysId,
      selectedVilleId,
      paysList,
      villesList,
      isLoading,
      showPassword,
      showConfirmPassword,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
      handlePaysChange,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.member-access-container {
  min-height: 100vh;
  background-color: #f8fafc;
}

.member-access-content {
  display: flex;
  min-height: 100vh;
}

.left-column {
  flex: 1;
  display: none; /* Caché sur mobile */
}

.right-column {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: white;
}

.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a5d1a;
  margin-bottom: 2rem;
  text-align: center;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: #f8fafc;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #1a5d1a;
  box-shadow: 0 0 0 3px rgba(26, 93, 26, 0.1);
  outline: none;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-success {
  background-color: #1a5d1a;
  color: white;
}

.btn-success:hover {
  background-color: #164a16;
}

/* Media queries */
@media (min-width: 1024px) {
  .left-column {
    display: block; /* Afficher sur desktop */
  }

  .right-column {
    max-width: 50%;
  }
}
</style>
