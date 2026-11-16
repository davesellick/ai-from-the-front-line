# Sidgrove Intelligence section (slides 33-51)

Recaptured 03 Nov 2026 (files ending `-nov03`) from Sidgrove Intelligence at master `72ec95f0d`, on a private local dev server at 2x. Each page is a whole browser window, sidebar to footer and full width, shot at the exact shape of the frame it sits in on the slide, so the deck's `object-fit: cover` never crops the side or the bottom off a page (the 22 October shots on the two-up overview slide lost their right-hand side this way). Saved as JPEG quality 94 with full 4:4:4 colour, so small coloured text stays sharp on a projector. Every request that was not a read was blocked, the payroll cache and "recently viewed" updates included, with two exceptions, both reads that go as a POST: the live P&L's own report and, on the cashflow page, the supplier logo lookup, sent with `cacheOnly=1` so it only reads logos already known and starts no web search. The cashflow page was retaken that way later the same day so the real supplier logos show instead of placeholders. The only clicks were tabs, the VAT review row and the "stopped models" disclosure.

- Window sizes (CSS px): 1600x900 (hero, prepayments), 1600x781 (AI integrations), 1600x831 (live P&L, forecast), 1920x997 (the prepayments schedule behind the AI findings lens), 1440x910 (cashflow, management pack, VAT), 1440x810 (payroll reallocations, corporation tax), 1600x1011 (bookkeeping), 1200x1270 (the two-up overview and year-end slides), 1100x1410 (deadlines, payroll, the new starter form), 1040x880 (company info), 1000x627 and 1000x800 (forms and proposals hubs).
- Circle is the demo client: its data is synthetic and shown as is, apart from one prepayment line called "Test", shown as Tidewell Insurance, and two payroll notes reading "test", shown as "Pay rise from May" and "Back from leave".
- Practice-wide pages are shot in demo mode, which now scales every £ figure by one hidden factor and gives every client a made-up name.
- Company info is Circle's invented demo record (Circle (Demo) Limited, Alex Sample and so on), so nothing on it was changed.
- Proposals hub: the two drafts read "blocks test (safe to archive)" and "test", shown as "Annual accounts & tax" and Tidewell Studio.
- The prepayments schedule shows "Ledger unavailable" when the server has no Xero link; that pill was hidden, as it says nothing about the page. The table was scrolled so the LinkedIn line sits under the slide's lens.
- Year-end working papers is now two full windows (P&L review and balance sheet); the old hub strip across the top was a crop of the page.
- Management accounts slide: `pack-summary-nov05.jpg` is the pack itself (Automatic view, summary page), retaken 05 Nov 2026 at master `9cdbd750d` in place of the revenue page. It is set to April 2026, the last fully posted month that reads properly; the app opens on August, where the books have stopped and the figures look broken.
- Kept from earlier: the 13-week forecast (`st-cashflow-oct14.jpg`; on this server it shows "Partial sources" with no cash figures), the three group pages from 14 October (the matrix needs a refresh from Xero, a write), `proposal-fees-oct22.jpg`, `live-4-menu-li.jpg` and `ai-finding-li.jpg` (the LinkedIn bill before it was scheduled; recreating it needs a write).
- `setlist-nov05.jpg` is the Setlist desktop window in Day view, cropped wide, with client names and logos replaced by the deck's made-up clients.
- `acapella.png` is Dave's own screenshot of Acapella.

## 05/11/2026 round

Retaken from the latest app code: deadlines (both), overviews, cashflow, accruals, bookkeeping, payroll review and journal, VAT, company info, proposals and integrations. Live P&L and corp tax stay on the 03/11 shots, because the capture server has no Xero credentials and those pages would show an error.

Text changed for the slides: the bookkeeping client note, the VAT "days late" line (the demo return is a year old) and the user name in the practice sidebar. The Setlist shots had real client names and logos, so those rows now use the deck's made-up clients and the old files are gone.

## 16/11/2026 round

Retaken from Sidgrove Intelligence at master `1ad6e34bbb` (files ending `-nov16`), the same way as before: private local dev server, demo mode, every write blocked and the server given no way to reach Xero. Each new file has the same pixel size as the one it replaces, so no frame on a slide changed shape.

Retaken: practice overview (hero and tall), cashflow, forecast, deadlines (both), prepayments (`accruals` and the wider `ai-schedule`), payroll reallocations, bookkeeping, payroll review and journal, VAT, year-end P&L review and balance sheet, company info (both), forms hub, proposals hub and AI integrations. The older files they replace are gone.

Text changed for the slides, as in earlier rounds: the prepayment line "Test" reads Tidewell Insurance, the payroll note "test" reads "Pay rise from May", the two proposal drafts read "Annual accounts & tax" and Tidewell Studio, the "Ledger unavailable" pill is hidden and the VAT banner's "374 days late." reads "Not filed yet." (the demo return is a year old). The stopped-models line on AI integrations is opened.

Lenses: the two cashflow lenses still land on the bank accounts and the Software - Bus Dev rows, so they were left alone. The bookkeeping lens moved to `-403px -547px` to start on a whole row and the prepayments lens moved to `-337px -771px`, where the LinkedIn line now sits.

Not retaken, because the page needs Xero and shows an error without it: the management pack (`pack-summary-nov05.jpg`; it now reads Xero's own P&L and says "P&L did not load" on every month), the client overview (`client-overview-nov05.jpg`; its key figures and revenue panels wait on the pack), live P&L and corp tax (03/11) and the 13-week forecast (14/10). The new starter form, the group pages, the proposal fees shot and the two `-li` lens sources are also unchanged.
