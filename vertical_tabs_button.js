const icon_by_state = {
  true: "vertical_tabs_off.svg",
  false: "vertical_tabs_on.svg",
};

const message_by_state = {
  true: "disable_vertical_tabs",
  false: "enable_vertical_tabs",
};



async function read_vertical_tabs_enabled() {
  const setting_details = await browser.browserSettings.verticalTabs.get({});
  return Boolean(setting_details.value);
}



async function update_button_state(vertical_tabs_enabled) {
  await browser.browserAction.setIcon({
    path: icon_by_state[vertical_tabs_enabled],
  });

  await browser.browserAction.setTitle({
    title: browser.i18n.getMessage(message_by_state[vertical_tabs_enabled]),
  });
}



async function initialize_button_state() {
  const vertical_tabs_enabled = await read_vertical_tabs_enabled();
  await update_button_state(vertical_tabs_enabled);
}



async function toggle_vertical_tabs() {
  const vertical_tabs_enabled = await read_vertical_tabs_enabled();
  const next_vertical_tabs_enabled = !vertical_tabs_enabled;

  const setting_was_changed = await browser.browserSettings.verticalTabs.set({
    value: next_vertical_tabs_enabled,
  });

  if (setting_was_changed) {
    await update_button_state(next_vertical_tabs_enabled);
    return;
  }

  await initialize_button_state();
}



browser.browserAction.onClicked.addListener(() => {
  toggle_vertical_tabs().catch(console.error);
});

browser.browserSettings.verticalTabs.onChange.addListener((change_details) => {
  update_button_state(Boolean(change_details.value)).catch(console.error);
});

initialize_button_state().catch(console.error);
