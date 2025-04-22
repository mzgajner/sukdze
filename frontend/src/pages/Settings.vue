<script lang="ts" setup>
import SettingsBackup from '#/components/SettingsBackup.vue'
import SettingsRestore from '#/components/SettingsRestore.vue'
import SettingsTags from '#/components/SettingsTags.vue'
import SettingsLogout from '#/components/SettingsLogout.vue'
</script>

<template>
  <div class="flex flex-col select-none">
    <SettingsWrapper
      title="Backup"
      description="Create a backup of all your stored data and download it."
    >
      <SettingsBackup />
    </SettingsWrapper>

    <SettingsWrapper
      title="Restore"
      description="Restore data from a previously created backup."
    >
      <SettingsRestore />
    </SettingsWrapper>

    <SettingsWrapper title="Tags">
      <SettingsTags />
    </SettingsWrapper>

    <SettingsWrapper title="Update">
      <SettingsUpdate />
    </SettingsWrapper>

    <SettingsWrapper title="Logout">
      <SettingsLogout />
    </SettingsWrapper>
  </div>
</template>
