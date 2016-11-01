/*
 *     Copyright (C) 2010-2016 Marvell International Ltd.
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

var Bin = {
	comp(a1, a2, n = -1) {
		var i1 = new Uint8Array(a1), i2 = new Uint8Array(a2);
		if (n >= 0) {
			if (i1.length < n && i2.length < n)
				;	// fall thru
			else if (i1.length < n)
				return -1;
			else if (i2.length < n)
				return 1;
		}
		else {
			if (i1.length > i2.length)
				return 1;
			else if (i1.length < i2.length)
				return -1;
			n = i1.length;
		}
		for (var i = 0; i < n; i++) {
			if (i1[i] != i2[i])
				return i1[i] - i2[i];
		}
		return 0;
	},
	xor(a1, a2) {
		var i1 = new Uint8Array(a1), i2 = new Uint8Array(a2);
		var len1 = i1.length, len2 = i2.length;
		var r = new Uint8Array(len1);
		for (var i = 0; i < len1; i++)
			r[i] = i1[i] ^ i2[i % len2];
		return r.buffer;
	},
	encode(buf) @ "xs_bin_encode",
	decode(str) @ "xs_bin_decode",
	pem_decode(str) @ "xs_pem_decode",
	/**
	 * generate ArrayBuffer with the value using minimum size but greater than 1
	 * @param number val 			value to be encoded.
	 * @param bool littleEndian		value will encoded in little endian or not.
	 * @return ArrayBuffer
	 */
	num2bin(val, littleEndian=false) {
		let blob = new ArrayBuffer(4);
		let view = new DataView(blob);
		view.setUint32(0, val, littleEndian);

		let size = (val <= 0xff ? 1 : val <= 0xffff ? 2 : val <= 0xffffff ? 3 : 4);
		let offset = littleEndian ? 0 : 4 - size;
		return blob.slice(offset, offset + size);
	},
};
export default Bin;