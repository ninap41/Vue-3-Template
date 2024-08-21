import { ref } from 'vue';

export function useModals() {
	// State to hold the IDs of open modals
	const openModals = ref(new Set());

	// Method to open a modal by ID
	const openModal = (id: string) => {
		openModals.value.add(id);
	};

	// Method to close a modal by ID
	const closeModal = (id: string) => {
		openModals.value.delete(id);
	};

	// Method to check if a modal is open by ID
	const isModalOpen = (id: string) => {
		return openModals.value.has(id);
	};

	return {
		openModal,
		closeModal,
		isModalOpen,
	};
}