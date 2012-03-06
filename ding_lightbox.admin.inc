<?php
/**
 * @file
 * 
 * Aministration FE/BE is located in this file.
 */

/**
 * Lightbox module settings form.
 */
function ding_lightbox_config_form($form, &$form_state) {
  $form['lightbox_display'] = array(
    '#type' => 'fieldset',
    '#title' => t('Activate lightbox on pages'),
  );

  $form['lightbox_display']['lightbox_item_landing_page'] = array(
    '#type' => 'checkbox',
    '#title' => t('Item landing page'),
    '#default_value' => variable_get('lightbox_item_landing_page', FALSE),
  );

  $form['lightbox_display']['lightbox_item_search_page'] = array(
    '#type' => 'checkbox',
    '#title' => t('Search result page'),
    '#default_value' => variable_get('lightbox_item_search_page', FALSE),
  );

  return system_settings_form($form);
}
