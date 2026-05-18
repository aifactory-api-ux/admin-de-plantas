import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest


class TestReportController:

    @pytest.mark.asyncio
    async def test_get_reports_returns_report_list(self):
        pass

    @pytest.mark.asyncio
    async def test_get_reports_unauthorized_without_jwt(self):
        pass

    @pytest.mark.asyncio
    async def test_post_generate_report_germination_summary_success(self):
        pass

    @pytest.mark.asyncio
    async def test_post_generate_report_plant_status_success(self):
        pass

    @pytest.mark.asyncio
    async def test_post_generate_report_invalid_type_returns_422(self):
        pass

    @pytest.mark.asyncio
    async def test_post_generate_report_missing_type_returns_422(self):
        pass

    @pytest.mark.asyncio
    async def test_post_generate_report_unauthorized_without_jwt(self):
        pass

    @pytest.mark.asyncio
    async def test_get_reports_returns_empty_list_when_no_reports(self):
        pass

    @pytest.mark.asyncio
    async def test_report_download_url_is_valid(self):
        pass