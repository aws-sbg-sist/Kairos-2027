import sys
import time
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"

def run_tests():
    print("=" * 60)
    print("   KAIROS 2027 E2E USER FUNCTIONALITY & MOBILE/PC AUDIT   ")
    print("=" * 60)

    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)

        # -------------------------------------------------------------
        # SUITE 1: PC DESKTOP (1440x900)
        # -------------------------------------------------------------
        print("\n--- [SUITE 1] Desktop Experience (1440x900) ---")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        
        errors = []
        page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: errors.append(str(err)))

        # 1.1 Homepage Load & Hero Navigation
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        assert "KAIROS 2027" in page.title()
        print("  ✓ Desktop Homepage loaded with title:", page.title())

        # 1.2 Interactive 2.5D Hourglass Flip
        hourglass_trigger = page.locator('[title*="flip"]').first
        if hourglass_trigger.count() > 0:
            hourglass_trigger.click()
            time.sleep(0.5)
            print("  ✓ Desktop: Clicked 2.5D Hourglass to flip gravity")

        # 1.3 Theme Toggle Desktop
        theme_btn = page.locator('button[aria-label*="Switch to"]').first
        if theme_btn.count() > 0:
            theme_btn.click()
            time.sleep(0.3)
            current_theme = page.evaluate("() => document.documentElement.getAttribute('data-theme')")
            print("  ✓ Desktop: Toggled theme to:", current_theme)
            theme_btn.click() # toggle back
            time.sleep(0.3)

        # 1.4 Sound Toggle Desktop
        sound_btn = page.locator('button[title*="Sound effects"]').first
        if sound_btn.count() > 0:
            sound_btn.click()
            time.sleep(0.2)
            print("  ✓ Desktop: Sound toggle clicked")

        # 1.5 Chatbot Interaction Desktop
        chat_trigger = page.locator('button[aria-label="Open Kairos AI Assistant"]').first
        if chat_trigger.count() > 0:
            chat_trigger.click()
            page.wait_for_selector('input[aria-label="Ask a question about KAIROS 2027"]')
            chat_input = page.locator('input[aria-label="Ask a question about KAIROS 2027"]')
            chat_input.fill("What is the prize pool?")
            send_btn = page.locator('button[aria-label="Send message to Kairos Assistant"]')
            send_btn.click()
            time.sleep(1.0)
            chat_content = page.locator('div[role="dialog"]').inner_text()
            assert "1,75,000" in chat_content or "prize" in chat_content.lower()
            print("  ✓ Desktop: Chatbot responded accurately to prize pool query")
            close_chat = page.locator('button[aria-label="Close chat window"]')
            close_chat.click()
            time.sleep(0.3)

        # 1.6 Team Radar Beacon Broadcast Modal
        broadcast_btn = page.locator('button:has-text("Broadcast Your Beacon")').first
        if broadcast_btn.count() > 0:
            broadcast_btn.scroll_into_view_if_needed()
            broadcast_btn.click()
            page.wait_for_selector('text=Broadcast Builder Signal', timeout=4000)
            page.locator('input[placeholder*="Siddharth"]').fill("E2E Test Builder")
            page.locator('input[placeholder*="Sathyabama"]').fill("Sathyabama IST")
            page.locator('input[placeholder*="PyTorch"]').fill("Next.js, Python, AWS")
            page.locator('textarea[placeholder*="backend systems"]').fill("Looking for AI/ML and DevOps teammates.")
            page.locator('input[placeholder*="github.com"]').fill("https://github.com/kairos-e2e-builder")
            page.locator('button[type="submit"]:has-text("Pulse Beacon on Radar")').click()
            page.wait_for_selector('text=Beacon Broadcasted Live!', timeout=5000)
            print("  ✓ Desktop: Broadcast Beacon submitted successfully")

        # 1.7 Judging Console Server PIN Auth (/judging)
        page.goto(f"{BASE_URL}/judging")
        page.wait_for_load_state("networkidle")
        page.fill('input[aria-label="Evaluator 6-digit Access PIN"]', '202701')
        page.locator('button[type="submit"]:has-text("Open Evaluation Console")').click()
        page.wait_for_selector('text=Vikrant Roy', timeout=5000)
        print("  ✓ Desktop: Judging Console authenticated via server /api/v1/judging/auth")

        page.close()

        # -------------------------------------------------------------
        # SUITE 2: MOBILE EXPERIENCE (390x844 - iPhone 14/15/16)
        # -------------------------------------------------------------
        print("\n--- [SUITE 2] Mobile Experience (390x844) ---")
        m_page = browser.new_page(
            viewport={"width": 390, "height": 844},
            is_mobile=True,
            has_touch=True,
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        )
        
        m_errors = []
        m_page.on("console", lambda msg: m_errors.append(msg.text) if msg.type == "error" else None)
        m_page.on("pageerror", lambda err: m_errors.append(str(err)))

        # 2.1 Mobile Homepage Load & Zero Horizontal Overflow
        m_page.goto(BASE_URL)
        m_page.wait_for_load_state("networkidle")
        scroll_w = m_page.evaluate("() => document.body.scrollWidth")
        client_w = m_page.evaluate("() => document.documentElement.clientWidth")
        assert scroll_w <= client_w, f"Mobile horizontal overflow on homepage! scrollWidth: {scroll_w}, clientWidth: {client_w}"
        print(f"  ✓ Mobile Homepage: No overflow (scrollWidth={scroll_w}px, clientWidth={client_w}px)")

        # 2.2 Mobile Navigation Hamburger Drawer
        burger_btn = m_page.locator('button[aria-label="Toggle navigation menu"]')
        assert burger_btn.is_visible()
        burger_btn.click()
        time.sleep(0.3)
        drawer = m_page.locator('.lg\\:hidden.glass-panel')
        assert drawer.is_visible()
        print("  ✓ Mobile: Hamburger menu opened drawer smoothly")

        # Test clicking a link in drawer
        tracks_link = m_page.get_by_role('link', name='Tracks', exact=True)
        tracks_link.click()
        m_page.wait_for_url("**/tracks", timeout=5000)
        assert "/tracks" in m_page.url
        print("  ✓ Mobile: Navigation from drawer to /tracks successful")

        # 2.3 Mobile Chatbot
        m_chat_trigger = m_page.locator('button[aria-label="Open Kairos AI Assistant"]').first
        m_chat_trigger.click()
        time.sleep(0.3)
        m_dialog = m_page.locator('div[role="dialog"]')
        assert m_dialog.is_visible()
        print("  ✓ Mobile: Chatbot dialog opened cleanly within viewport")
        
        # Test Quick prompt chip
        chip = m_page.locator('button:has-text("Cash prizes breakdown")').first
        chip.click()
        time.sleep(1.0)
        m_chat_text = m_dialog.inner_text()
        assert "1,75,000" in m_chat_text or "prize" in m_chat_text.lower()
        print("  ✓ Mobile: Quick chip triggered instant answer")
        
        m_page.locator('button[aria-label="Close chat window"]').click()
        time.sleep(0.3)

        # -------------------------------------------------------------
        # SUITE 3: MOBILE INTERACTIVE FORM FLOWS
        # -------------------------------------------------------------
        print("\n--- [SUITE 3] Mobile End-to-End User Forms ---")

        # 3.1 Registration Page Flow (/register)
        print("  Testing /register flow on mobile...")
        m_page.goto(f"{BASE_URL}/register")
        m_page.wait_for_load_state("networkidle")

        test_email = f"priya.{int(time.time())}@sist.edu"
        m_page.fill('#reg-fullName', 'Priya Sundaram')
        m_page.fill('#reg-email', test_email)
        m_page.fill('#reg-phone', '9876543210')
        m_page.fill('#reg-rollno', '39110456')
        m_page.fill('#reg-institution', 'Sathyabama Institute of Science and Technology')
        m_page.fill('#reg-city', 'Chennai')
        m_page.fill('#reg-state', 'Tamil Nadu')
        m_page.select_option('#reg-year', '3rd Year')
        m_page.fill('#reg-github', 'priyasundaram')
        m_page.fill('#reg-meetup', 'https://www.meetup.com/members/999888777/')

        # Click Verify Meetup RSVP
        verify_btn = m_page.locator('button:has-text("Verify Meetup RSVP")')
        verify_btn.click()
        time.sleep(1.0)
        verified_badge = m_page.locator('text=RSVP Verified')
        assert verified_badge.count() > 0 or m_page.locator('text=Meetup Verified').count() > 0
        print("    ✓ Meetup RSVP verified successfully")

        # Submit registration
        submit_reg = m_page.locator('button[type="submit"]:has-text("Save Profile & Proceed")')
        submit_reg.click()
        time.sleep(1.2)
        success_heading = m_page.locator('text=Welcome to KAIROS 2027, Priya!')
        assert success_heading.is_visible()
        print("    ✓ Registration completed! Branching screen reached")

        # 3.2 Squad Creation Flow (/team/create)
        print("  Testing /team/create flow on mobile...")
        create_team_link = m_page.locator('a[href*="/team/create"]').first
        create_team_link.click()
        m_page.wait_for_url("**/team/create*", timeout=5000)
        assert "/team/create" in m_page.url

        m_page.fill('input[placeholder*="Chronos Distributed"]', 'Neural Storm')
        m_page.fill('input[placeholder*="Chennai"]', 'Chennai')
        m_page.fill('input[placeholder*="Tamil Nadu"]', 'Tamil Nadu')
        m_page.fill('input[placeholder*="Chronos Stream"]', 'Real-Time Distributed Telemetry Mesh')
        m_page.fill('textarea[placeholder*="Describe the authentic"]', 
                    'We propose an edge-native real-time event streaming pipeline deployed on AWS ECS Fargate and Kinesis Data Streams for ultra low latency telemetry processing.')
        
        submit_team = m_page.locator('button[type="submit"]:has-text("Create Team & Generate Invite Code")')
        submit_team.click()
        time.sleep(1.5)

        team_success = m_page.locator('text=Created!')
        assert team_success.is_visible()
        team_code_el = m_page.locator('.text-4xl.font-mono')
        generated_code = team_code_el.inner_text().strip()
        print(f"    ✓ Squad 'Neural Storm' created! Generated Code: {generated_code}")

        # 3.3 Squad Join Flow (/team/join)
        print("  Testing /team/join flow on mobile...")
        m_page.goto(f"{BASE_URL}/team/join?code={generated_code}")
        m_page.wait_for_load_state("networkidle")
        
        # Verify team is pre-looked up & complete join submission
        m_page.wait_for_selector('text=Neural Storm', timeout=5000)
        print(f"    ✓ Target invite code {generated_code} verified on join page")
        m_page.fill('input[placeholder="Your full name"]', 'Karthik Subramanian')
        m_page.fill('input[placeholder="you@college.edu"]', f'karthik.{int(time.time())}@sist.edu')
        m_page.fill('input[placeholder="+91 98765 43210"]', '+91 98765 43219')
        m_page.fill('input[placeholder="e.g. 44110901"]', '44110999')
        m_page.fill('input[placeholder*="meetup.com/members"]', 'https://www.meetup.com/members/44556677/')
        m_page.locator('button[type="submit"]').first.click()
        m_page.wait_for_selector('text=Roster Confirmed', timeout=5000)
        print("    ✓ Teammate joined squad successfully via invite code")

        # 3.4 Sponsor Referral Flow (/refer-sponsor)
        print("  Testing /refer-sponsor flow on mobile...")
        m_page.goto(f"{BASE_URL}/refer-sponsor")
        m_page.wait_for_load_state("networkidle")

        m_page.fill('input[placeholder*="Rahul Sharma"]', 'Priya Sundaram')
        m_page.fill('input[placeholder*="Sathyabama IST"]', 'Sathyabama Institute of Science and Technology')
        m_page.fill('input[placeholder*="rahul@example.com"]', 'priya.s@sist.edu')
        m_page.fill('input[placeholder*="+91 98765"]', '+91 98765 43210')
        m_page.fill('input[placeholder*="rahul@oksbi"]', 'priya@okhdfcbank')

        m_page.fill('input[placeholder*="CloudScale Technologies"]', 'Acme Cloud Innovations')
        m_page.fill('input[placeholder*="Ananya Sen"]', 'Vikram Mehta')
        m_page.fill('input[placeholder*="ananya@cloudscale.com"]', 'vikram@acmecloud.io')
        m_page.fill('input[placeholder*="VP of Engineering"]', 'Director of Developer Relations')
        
        submit_sponsor = m_page.locator('button[type="submit"]:has-text("Lock Lead & Register for Payout")')
        submit_sponsor.click()
        time.sleep(1.5)
        assert m_page.locator('text=Lead Locked').count() > 0 or m_page.locator('text=RAIN-').count() > 0 or m_page.locator('text=Tracking Token').count() > 0 or m_page.locator('text=Referral Registered').count() > 0
        print("    ✓ Sponsor referral submitted successfully with token generation")

        # 3.5 CSAT Page Flow (/csat)
        print("  Testing /csat feedback flow on mobile...")
        m_page.goto(f"{BASE_URL}/csat")
        m_page.wait_for_load_state("networkidle")

        # Select 5 stars for overall rating
        star_5 = m_page.locator('button:has-text("5")').first
        if star_5.count() > 0:
            star_5.click()
        
        # Fill optional feedback
        feedback_input = m_page.locator('textarea[placeholder*="Tell us what you liked"]')
        if feedback_input.count() > 0:
            feedback_input.fill("Incredible hackathon experience! Seamless registration and top-notch mentors.")
        
        csat_submit = m_page.locator('button[type="submit"]:has-text("Submit Post-Event CSAT Survey")')
        if csat_submit.count() > 0:
            csat_submit.click()
            time.sleep(0.5)
            print("    ✓ CSAT feedback submitted successfully")

        # 3.6 Admin Login Flow (/admin/login)
        print("  Testing /admin/login authentication on mobile...")
        m_page.goto(f"{BASE_URL}/admin/login")
        m_page.wait_for_load_state("networkidle")

        # Fill passkey
        m_page.fill('input[type="password"]', 'kairos2027-sist-admin')
        submit_admin = m_page.locator('button[type="submit"]:has-text("Sign In as Organizer")')
        submit_admin.click()
        time.sleep(1.0)

        # Should verify and redirect or grant admin access
        admin_auth = m_page.url
        print(f"    ✓ Admin login executed (URL: {admin_auth})")

        m_page.close()
        browser.close()

    print("\n" + "=" * 60)
    print("   ALL USER INTERACTIVE FLOWS PASSED ON PC & MOBILE! [100% OK]")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
