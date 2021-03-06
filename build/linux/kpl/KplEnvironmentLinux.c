/*
 *     Copyright (C) 2010-2015 Marvell International Ltd.
 *     Copyright (C) 2002-2010 Kinoma, Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */
#include "KplEnvironment.h"
#include <unistd.h>
#include <sys/utsname.h>
#if SUPPORT_LINUX_GTK
    #include <glib.h>
#endif

FskErr KplEnvironmentInitialize(FskAssociativeArray environment)
{
	struct utsname name;
	uname(&name);

	FskEnvironmentSet("OS", name.sysname);
	FskEnvironmentSet("OSVersion", name.release);

#if LINUX_PLATFORM || SUPPORT_LINUX_GTK || LINUX || defined(linux)
    FskEnvironmentSet("platform", "linux");
#else
    #error "What is your platform?"
#endif
#if SUPPORT_LINUX_GTK
	char* directory;
	
	if ((directory = g_get_user_special_dir(G_USER_DIRECTORY_DOCUMENTS)))
		FskEnvironmentSet("DocumentsDir", FskStrDoCat(directory, "/"));
	if ((directory = g_get_user_special_dir(G_USER_DIRECTORY_PICTURES)))
		FskEnvironmentSet("PhotosDir", FskStrDoCat(directory, "/"));
	if ((directory = g_get_user_special_dir(G_USER_DIRECTORY_MUSIC)))
		FskEnvironmentSet("MusicDir", FskStrDoCat(directory, "/"));
	if ((directory = g_get_user_special_dir(G_USER_DIRECTORY_VIDEOS)))
		FskEnvironmentSet("VideoDir", FskStrDoCat(directory, "/"));
#endif

	return kFskErrNone;
}

