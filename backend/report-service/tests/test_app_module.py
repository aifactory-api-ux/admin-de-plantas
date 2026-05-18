import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest


class TestReportAppModule:

    @pytest.mark.asyncio
    async def test_app_module_imports_report_module(self):
        pass

    @pytest.mark.asyncio
    async def test_app_module_fails_on_missing_dependencies(self):
        pass

    @pytest.mark.asyncio
    async def test_app_module_configuration_is_valid(self):
        pass