from rest_framework.routers import Route, SimpleRouter


class CustomRouter(SimpleRouter):
    # A custom router for message endpoint

    routes = [
        Route(
            url=r'create',
            mapping={'post': 'create'},
            name='{basename}-post',
            detail=True,
            initkwargs={'suffix': 'Create'}
        ),
        Route(
            url=r'^{prefix}$',
            mapping={'get': 'list'},
            name='{basename}-list',
            detail=False,
            initkwargs={'suffix': 'List'}
        ),
        Route(
            url=r'^{prefix}/{lookup}$',
            mapping={'get': 'retrieve'},
            name='{basename}-detail',
            detail=True,
            initkwargs={'suffix': 'Detail'}
        ),

    ]