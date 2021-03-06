<template>
  <div>
    <v-card class="elevation-3">
      <v-card-title class="primary white--text">
        <h3 class="headline">{{ project.title }}</h3>
      </v-card-title>
      <v-card-text class="secondary py-0 pl-1">
        <v-row class="mx-auto">
          <v-col cols="auto" class="text-center py-1">
            <v-row justify="center" class="flex-column ma-0 fill-height">
              <v-icon left class="white--text">{{
                'mdi-' + project.section.icon
              }}</v-icon>
            </v-row>
          </v-col>
          <v-col class="pa-0">
            <v-row justify="center" class="flex-column ma-0 fill-height">
              <p
                class="
                  text-body-1
                  white--text
                  text-left
                  font-weight-black
                  my-auto
                "
              >
                {{ project.section.name }}
              </p>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-left">
        <markdown-it-vue
          class="md-body"
          :content="project.text + '...'"
          :options="markdownOptions"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn-cap
          depressed
          color="warning"
          :to="{ name: 'project', params: { id: project.id } }"
          >Zobacz więcej</v-btn-cap
        >
        <v-speed-dial direction="top" v-if="role" v-model="fab" class="ml-2">
          <template v-slot:activator>
            <v-btn-cap
              x-small
              fab
              v-model="fab"
              class="text-body-1 font-weight-bold"
              color="primary"
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn-cap>
          </template>
          <v-btn-cap
            fab
            x-small
            color="orange"
            :to="{ name: 'editProject', params: { id: project.id } }"
          >
            <v-icon>mdi-pen</v-icon>
          </v-btn-cap>
          <v-btn-cap fab x-small color="error" @click="dialog = true">
            <v-icon>mdi-delete</v-icon>
          </v-btn-cap>
        </v-speed-dial>
      </v-card-actions>
    </v-card>
    <confirmation-dialog
      v-if="dialog"
      @yes="deleteProject"
      @no="dialog = false"
      :text="dialogText"
    ></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProjectModel } from '@/models/ProjectModel';

@Component
export default class ProjectCard extends Vue {
  @Prop() public project!: ProjectModel;
  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get role(): boolean {
    return this.$store.getters.isAdministrator;
  }

  private removeMarkdown(text: string) {
    const removeMd = require('remove-markdown');
    return removeMd(text);
  }

  get dialogText() {
    return 'Czy na pewno chcesz usunąć projekt "' + this.project.title + '"?';
  }

  get text(): string {
    return this.removeMarkdown(this.project.text);
  }

  private deleteProject() {
    this.$data.dialog = false;
    this.$emit('delete', this.project.id);
  }

  private data() {
    return {
      fab: false,
      dialog: false,
      markdownOptions: {
        githubToc: {
          anchorLink: false,
        },
      },
    };
  }
}
</script>
