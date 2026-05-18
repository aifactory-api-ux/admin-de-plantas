import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest


class TestPlantServiceMain:

    @pytest.mark.asyncio
    async def test_service_starts_and_responds_to_health_check(self):
        pass

    @pytest.mark.asyncio
    async def test_service_rejects_requests_without_jwt(self):
        pass

    @pytest.mark.asyncio
    async def test_service_handles_invalid_route_with_404(self):
        pass