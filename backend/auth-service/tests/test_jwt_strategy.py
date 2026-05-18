import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest
from unittest.mock import AsyncMock, MagicMock, patch


class TestJwtStrategy:

    @pytest.mark.asyncio
    async def test_jwt_strategy_valid_token_returns_user_payload(self):
        pass

    @pytest.mark.asyncio
    async def test_jwt_strategy_invalid_token_raises_exception(self):
        pass

    @pytest.mark.asyncio
    async def test_jwt_strategy_expired_token_raises_exception(self):
        pass