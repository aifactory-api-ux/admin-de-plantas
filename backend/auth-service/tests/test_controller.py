import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest
import httpx
from unittest.mock import AsyncMock, MagicMock, patch
import asyncio


class TestAuthController:

    @pytest.fixture
    def mock_user_service(self):
        return AsyncMock()

    @pytest.fixture
    def mock_jwt_service(self):
        return AsyncMock()

    @pytest.mark.asyncio
    async def test_register_valid_user_returns_201_and_user_object(self):
        pass

    @pytest.mark.asyncio
    async def test_register_duplicate_email_returns_400(self):
        pass

    @pytest.mark.asyncio
    async def test_register_missing_password_returns_422(self):
        pass

    @pytest.mark.asyncio
    async def test_login_valid_credentials_returns_201_and_token(self):
        pass

    @pytest.mark.asyncio
    async def test_login_invalid_password_returns_401(self):
        pass

    @pytest.mark.asyncio
    async def test_login_missing_username_returns_422(self):
        pass

    @pytest.mark.asyncio
    async def test_me_with_valid_jwt_returns_user(self):
        pass

    @pytest.mark.asyncio
    async def test_me_with_invalid_jwt_returns_401(self):
        pass

    @pytest.mark.asyncio
    async def test_me_without_jwt_returns_401(self):
        pass