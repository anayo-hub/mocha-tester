const assert = require('assert');

describe('Translations Telemetry', function() {
  it('should initiate auto-translate request and capture telemetry events', async function() {
    this.timeout(5000); // Increase timeout if needed

    const { cleanup, resolveDownloads, runInPage } = await loadTestPage({
      page: SPANISH_PAGE_URL,
      languagePairs: LANGUAGE_PAIRS,
      prefs: [
        ["browser.translations.panelShown", false],
        ["browser.translations.alwaysTranslateLanguages", ""],
      ],
    });

    await assertTranslationsButton({ button: true }, "The button is available.");
    await assertPageIsUntranslated(runInPage);

    await openTranslationsPanel({ onOpenPanel: assertPanelFirstShowView });
    await openTranslationsSettingsMenu();
    await clickAlwaysTranslateLanguage({
      downloadHandler: resolveDownloads,
    });

    await assertPageIsTranslated("es", "en", runInPage);

    await assertGleanEvent(Glean.translationsPanel.open, {
      expectedEventCount: 1,
      expectNewFlowId: true,
      expectFirstInteraction: true,
      finalValuePredicates: [
        value => value.extra.auto_show === "false",
        value => value.extra.view_name === "defaultView",
        value => value.extra.opened_from === "translationsButton",
        value => value.extra.document_language === "es",
      ],
    });
    await assertGleanEvent(Glean.translationsPanel.alwaysTranslateLanguage, {
      expectedEventCount: 1,
      expectNewFlowId: false,
      expectFirstInteraction: true,
      finalValuePredicates: [value => value.extra.language === "es"],
    });
    await assertGleanEvent(Glean.translationsPanel.close, {
      expectedEventCount: 1,
      expectNewFlowId: false,
      expectFirstInteraction: true,
    });
    await assertGleanEvent(Glean.translationsPanel.close, {
      expectedEventCount: 1,
      expectNewFlowId: false,
      expectFirstInteraction: true,
    });
    await assertGleanEvent(Glean.translations.translationRequest, {
      expectedEventCount: 1,
      expectNewFlowId: false,
      expectFirstInteraction: true,
    });

    await openTranslationsPanel({ onOpenPanel: assertPanelRevisitView });
    await clickRestoreButton();

    await assertGleanEvent(Glean.translationsPanel.open, {
      expectedEventCount: 2,
      expectNewFlowId: true,
      expectFirstInteraction: false,
      finalValuePredicates: [
        value => value.extra.auto_show === "false",
        value => value.extra.view_name === "revisitView",
        value => value.extra.opened_from === "translationsButton",
        value => value.extra.document_language === "es",
      ],
    });

    await assertGleanEvent(Glean.translationsPanel.restorePageButton, {
      expectedEventCount: 1,
      expectFirstInteraction: false,
      expectNewFlowId: false,
    });

    await assertGleanEvent(Glean.translationsPanel.close, {
      expectedEventCount: 2,
      expectFirstInteraction: false,
      expectNewFlowId: false,
    });

    await assertTranslationsButton({ button: true }, "The button is available.");
    await assertPageIsUntranslated(runInPage);

    await cleanup();
  });
});
