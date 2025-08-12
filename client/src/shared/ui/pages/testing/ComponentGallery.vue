<template>
	<div class="p-m space-y-m max-w-[1200px] mx-auto">
		<h1 class="text-h4-bold text-main">Component Gallery</h1>

		<!-- Tabs -->
		<div class="flex flex-wrap gap-xxxxs border-b border-default" role="tablist" aria-label="Component categories">
			<button
				v-for="t in tabs"
				:id="`tab-${t.id}`"
				:key="t.id"
				role="tab"
				class="relative bg-transparent border-0 px-xxs py-xxxxs text-muted rounded-s rounded-b-none transition-colors hover:bg-subtle hover:text-main"
				:class="currentTab === t.id ? 'text-main font-semibold after:content-[\'\'] after:absolute after:left-0 after:right-0 after:-bottom-px after:h-[3px] after:bg-[var(--accent-main)] after:rounded-t-[2px]' : ''"
				:aria-selected="currentTab === t.id"
				:tabindex="currentTab === t.id ? 0 : -1"
				@click="currentTab = t.id"
			>
				{{ t.label }}
			</button>
		</div>

		<!-- Panels -->
		<section
			v-if="currentTab === 'atoms'"
			class="pt-xxs space-y-s"
			role="tabpanel"
			aria-labelledby="tab-atoms"
		>

			<!-- Buttons showcase -->
			<div class="space-y-xxs">
				<h3 class="text-h6-bold text-main">Buttons</h3>
				<div class="p-xxxxs border border-default rounded-s bg-card space-y-xxxxs">
					<p class="opacity-75 text-h4 text-muted">Primary</p>
					<div class="flex flex-wrap gap-xxxxs">
						<ButtonClick>primary</ButtonClick>
					</div>
				</div>
			</div>

			<!-- Theme Switch removed -->
		</section>

		<section
			v-else
			class="pt-xxs"
			role="tabpanel"
			:aria-labelledby="`tab-${currentTab}`"
		>
			<p class="text-body-medium text-muted">Tab "{{ currentTab }}" not implemented yet.</p>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonClick from '../../atoms/button.vue';

interface TabDef { id: string; label: string }
const tabs: TabDef[] = [
	{ id: 'atoms', label: 'Atoms' },
	{ id: 'molecules', label: 'Molecules' },
	{ id: 'organisms', label: 'Organisms' },
	{ id: 'templates', label: 'Templates' },
	{ id: 'pages', label: 'Pages' }
];

const currentTab = ref<string>('atoms');
// Only primary variant supported currently. Theme switch removed.
</script>

<!-- All styling moved to utility classes using tokens; no scoped styles needed -->
